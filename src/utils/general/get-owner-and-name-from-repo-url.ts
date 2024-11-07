export default function getFullnameFromRepositoryUrl(url: string): string {
    const urlParts = url.split("/")
    const urlPartsLength = urlParts.length
    return `${urlParts[urlPartsLength - 2]}/${urlParts[urlPartsLength - 1]}`
}