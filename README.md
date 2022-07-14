use-s3-uploader
===========================

From Browser
------------

```jsx
  import React, { useRef } from 'react';
  import { useS3Uploader } from '@mmmeff/use-s3-uploader';

  const Example = (props) => {
    const inputRef = useRef(null);

    const getSignedUrl = (file, next) => {
      next({
        signedUrl: "https://example.amazonaws.com/test.jpg?x-amz-acl=......."
      });
    };

    const onUploadStart = (file, next) => {
      next(file);
    }

    const onProgress = (percent, status, file) => {
      console.log('onProgress', percent, status, file)
    }

    const onError = (error, file) => {
      console.log(error, file)
    }

    const onFinish = (signResult, file) => {
      console.log(signResult, file);
    }

    useS3Uploader({
      getSignedUrl: getSignedUrl,
      onUploadStart: onUploadStart,
      onProgress: onProgress,
      onError: onError,
      onFinish: onFinish,
      accept: 'image/*',
      uploadRequestHeaders: (file) => ({
      }),
      contentDisposition: 'auto',
    }, inputRef);

    return (
      <div>
        <input type='file' ref={inputRef} multiple={true} />
      </div>
    )
  }

  export default Example;
```
