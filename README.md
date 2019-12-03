Descripción => Aplicación para el control de jornada. 


------------------------------------------------------------------


Funcionalidades => La app estará basada en la aplicación de roles: 

empleado
jefe de equipo
recursos humanos
empresaurio



1. Empleado => Podrá loguearse, desloguearse, subir archivos  (con email y contraseña ), fichar, fin de jornada laboral (con número de trabajador y password) . EN “/ ” habrá dos opciones de logueo; una para consultar perfil, subir documentos (justificante), hacer peticiones. / Otra opción de autenticación para fichar. En esta vista solo se podría ver el estado de “trabajando / no trabajando”

2. jefe de equipo =>  Las mismas que el trabajador + el rol de jefe de equipo que le permitirá recibir/ver notificaciones / qué miembros del equipo han fichado.

3. RRHH => Rol de recursos humanos / Editar estado / crear trabajadores / ver información de todos los trabajadores / equipo / departamento / consulta documentación. 

4. Empresaurio => Master & Commander / Modo dios. Puede modificar todos los campos. 



-----------------------------------------------

Modelos 


Modelo de trabajador: 

numero de trabajador: number, unique, required. 
nombre: {
	apellidos: string, 
nombre: string, required 
} 
email: string, required, unique
contraseña: (se genera una vez que el usuario se valide): string, required. 
foto de perfil: string
Equipo: string (populate)
Rol: [trabajador, jefe de equipo, empresaurio], required
isRRHH: boolean, default: false
estado de fichaje: boolean, default: false
descanso: boolean, default: false.
estado: [alta, baja, vacaciones, despedido, baja definitiva]
contrato: populate con modelo de contrato

**jornada-vigente? sino no sabemos en que jornada tenemos que poner la hora de finalización

------------------------------------------
Modelo de contrato

contrato: {
	tipo de contrato: [indefindo, temporal, practicas, fin de obra] => crear modelo	
	periodo de prueba: boolean, default: true, 
	tipo de jornada: [parcial, completa, por horas]
	horario: [mañana, tarde, noche]
	tiempo de descanso por contrato: number, default: 0,
}


--------------------------------------------


Pedro


------------------------------------------
Modelo de jornada 
 

tipo de contrato: populate con contrato. 
hora de entrada requerida: date, required
hora de salida requerida: date,

(Esto lo podemos utilizar para calcular tiempos de jornada, horas cumplidas etc etc.)

hora de entrada: type: date, required. 
hora de salida: type: date, required. 
descanso: boolean, default: false,
tiempo de descanso por contrato: populate de contrato.  
tiempo de descanso disfrutado: number. 

-----------------------------
Modelo de equipo

departamento: string, required. 
proyecto: string, required.
lista de miembros: populate de trabajadores
jefe de equipo: populate de trabajadores. 

------------------------------------

Modelo de documentación

tipo: seleccion 
persona a la que pertenece: popular con trabajador. 
archivo: str. 

