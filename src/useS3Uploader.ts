import { RefObject, useCallback, useEffect, useMemo } from "react";
import S3Uploader from './s3Uploader';

type Fn = (...args: any) => any;

export type SignResult<T> = T & { signedUrl: string };

export type Options<T> = {
  test?: boolean
  getSignedUrl?: (file: File, next: (data: SignResult<T>) => void) => void 
  onUploadStart?: (file: File, next: (file: File) => void) => void
  onSignedUrl?: Fn
  onProgress?: (percent: number, status: 'Waiting' | 'Completed' | 'Finalizing' | 'Uploading', file: File) => void
  onFinish?: (signResult: SignResult<T>, file: File) => void
  onError?: (error: Error, file: File) => void
  signingUrl?: string
  signingUrlMethod?: string
  signingUrlHeaders?: Object | ((file: File) => (Object))
  accept?: string
  uploadRequestHeaders?: Object | ((signResult: SignResult<T>, file: File) => (Object))
  contentDisposition?: string
}

const useS3Uploader = <T>(options: Options<T>, inputRef: RefObject<HTMLInputElement>) => {
  const s3Upload = useMemo(() => {
    const s3Uploader = new S3Uploader(options);
    if (options.test) console.log(s3Uploader);
    return s3Uploader;
  }, [options, inputRef]);

  const onFileChange = useCallback((event) => {
    const files = event.target.files || [];
    s3Upload.handle(files);
  }, []);

  useEffect(() => {
    inputRef.current?.addEventListener('change', onFileChange);
    return () => {
      inputRef.current?.removeEventListener('change', onFileChange);
    };
  }, [options, inputRef]);
}

export default useS3Uploader;
