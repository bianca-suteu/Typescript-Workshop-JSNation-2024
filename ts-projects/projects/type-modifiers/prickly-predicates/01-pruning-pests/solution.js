export const cropFamilies = {
    cactus: "Cactaceae",
    cassava: "Euphorbiaceae",
    chia: "Lamiaceae",
};
export function isCropName(name) {
    return name in cropFamilies;
}
