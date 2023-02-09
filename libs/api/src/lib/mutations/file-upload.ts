import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Mutation } from 'apollo-angular';

export const FILE_UPLOAD_MUTATION = gql`
  mutation FileUpload($bucketFolder: String, $fileName: String, $base64: String) {
    fileUpload(bucketFolder: $bucketFolder, fileName: $fileName, base64: $base64)
  }
`;
@Injectable({
  providedIn: 'root',
})
export class FileUploadGQL extends Mutation<
  {
    fileUpload: string;
  },
  {
    bucketFolder: string;
    fileName: string;
    base64: string;
  }
> {
  document = FILE_UPLOAD_MUTATION;
}
