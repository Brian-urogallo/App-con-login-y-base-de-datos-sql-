import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  
  listProduct: Product[] = [];

  constructor (private _productService: ProductService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
    this._productService.getProduct().subscribe(data =>{
      this.listProduct = data
      console.log(this.listProduct)
    })
  }

}
