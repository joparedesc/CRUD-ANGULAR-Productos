import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../model/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  products: Product[]= [];

  constructor(private productService:ProductService, private toast: ToastrService){

  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts():void{

    this.productService.list().subscribe(
      data=>{
        this.products=data;
      },
      err=>{
        this.toast.error(
          err.error.message,
          'Error',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          }
        );

      }
    );

  }

  onDelete(id: number):void{
    Swal.fire(
      {
        title: 'Are you sure?',
        text: 'You cannot undo',
        icon: 'warning',
        showCancelButton:  true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Canel' 
      }      
    ).then(
      (result)=>{
        if(result.value){
          
          this.productService.delete(id).subscribe(      
            data => {
              this.toast.success(data.message, 'Ok', { timeOut: 3000, positionClass: 'toast-top-center' });
              this.getProducts();
            },
            err => {
              this.toast.error(err.error.message, 'Error', { timeOut: 3000, positionClass: 'toast-top-center' });
            }      
          );
          /*
          this.productService.delete(id).subscribe(
          data => {
            this.toast.success(data.message, 'Ok', { timeOut: 3000, positionClass: 'toast-top-center' });
            this.getProducts();
          },
          err => {
            this.toast.error(err.error.message, 'Error', { timeOut: 3000, positionClass: 'toast-top-center' });
          }
        )*/
        }else if(result.dismiss==Swal.DismissReason.cancel){
          Swal.fire(
            {
              title: 'Canceled',
              text: 'Product not deleted',
              icon: 'error'
            }
          )
        }

      }
    )

  }

}
