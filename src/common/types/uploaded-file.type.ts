export type UploadedImageResponse = {
  image_url: string | undefined;
  image_public_id: string | undefined;
};

export type UploadedVideoResponse = {
  video_url: string | undefined;
  video_public_id: string | undefined;
};

export type UploadedFileResponse = UploadedImageResponse &
  UploadedVideoResponse;
