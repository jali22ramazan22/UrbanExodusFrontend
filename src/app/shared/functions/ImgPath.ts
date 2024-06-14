export function computeImagePath(imageName: string, pathToImage?: string): string{
  if (!pathToImage){
    return 'assets/img/' + imageName; //standard way to compute
  }
  if(pathToImage[pathToImage.length-1] === '/'){
    return pathToImage + imageName
  } else {
    return pathToImage + '/'+ imageName;
  }

}
