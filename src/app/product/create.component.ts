import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';

import { Product } from '../model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  name!: string;
  price!: number;

  constructor(
    private productService: ProductService,
    private toast: ToastrService,
    private router: Router
  ){}

  onCreate(): void{
    const product= new Product(this.name,this.price);
    this.productService.create(product).subscribe(
      data=>{
        this.toast.success(data.message,'Ok',{timeOut:3000, positionClass:'toast-top-center'});
        this.router.navigate(['']);
      },
      err=>{
        this.toast.error(err.error.message,'Error',{timeOut:3000,positionClass:'toast-top-center'});
      }
    );
  }

}
