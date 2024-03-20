import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{

  product: Product | undefined;

  constructor(
    private productService: ProductService,
    private toast: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void{
    const id= this.activeRoute.snapshot.params['id'];
    this.productService.detail(id).subscribe(
      data=>{
        this.product=data;
      },
      err=>{
        this.toast.error(
          err.error.message,
          'Error',
          {
            timeOut:3000,
            positionClass: 'toast-top-center'
          }
        );
        this.router.navigate(['']);
      }
    );

  }

  

}
