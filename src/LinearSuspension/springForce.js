export function springForce(kModulus, deltaY) {
    if (deltaY > 0) {
        return 0;
    }
    return Math.abs(kModulus*deltaY);
}