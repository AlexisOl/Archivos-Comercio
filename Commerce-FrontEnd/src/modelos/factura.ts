export class factura {
  identificador:null|number= null;
  nit_cliente!:string;
  nombre_cliente!:string;
  total_global!:number;
  total_descontado!:number;
  fecha_facturacion!:Date;
}
