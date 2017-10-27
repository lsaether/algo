
/// This function can be used to generate a random integer between
/// the floor and ceiling values.
export const getRandomInteger = (floor:number, ceiling:number): number => {
    return Math.floor(Math.random() * (ceiling - floor +1)) + floor
}
