export class Validaciones {
    static cedulaEcuatoriana(cedula: string): boolean {
        if (cedula.length !== 10) {
            return false;
        }
        const digitoRegion = parseInt(cedula.substring(0, 2));
        if (digitoRegion < 1 || digitoRegion > 24) {
            return false;
        }
        const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        const digitos = cedula.split('').map(d => parseInt(d));
        let total = 0;

        coeficientes.forEach((coef, index) => {
            let resultado = coef * digitos[index];
            if (resultado >= 10) resultado -= 9;
            total += resultado;
        });

        total = total % 10 ? 10 - (total % 10) : 0;
        return digitos[9] === total;
    }

    static correoValido(correo: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(correo);
    }

    static telefonoValido(telefono: string): boolean {
        const regex = /^09\d{8}$/;
        return regex.test(telefono);
    }
}
