export default async function b64toBlob(
  b64Data: string,
  contentType = "",
  sliceSize = 512
) {
  const res = await fetch(b64Data);
  const blob: any = await res.blob();

  return URL.createObjectURL(blob);
}
