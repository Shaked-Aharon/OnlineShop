import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public newCategory: string = "";
  public file;
  public newProduct: Product = new Product(undefined,"", "", 0, "");
  public productToEdit: Product = new Product(undefined,"", "", 0, "");
  public productsToChose: Product[];
  public chosenCategory: string = "";
  public chosenProduct: string;
  public oldProductIndex;

  constructor(
    public redux: NgRedux<AppState>,
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    if (this.redux.getState().allProducts.length === 0) {
      this.productsService.getAllProducts().subscribe((allProducts: Product[]) => {
        this.redux.getState().allProducts = allProducts;
        this.redux.getState().productsToShow = allProducts;
      });
      this.categoriesService.getAllCategories().subscribe((allCategories: Category[]) => {
        this.redux.getState().categories = allCategories;
      })
    }

  }

  public addCategory() {
    if(this.newCategory.length < 3){
      alert("Category name must be at least 3 char");
      return;
    }
    this.categoriesService.addCategory(this.newCategory)
      .subscribe(addedCategory => {
        this.redux.getState().categories.push(addedCategory);
        this.newCategory = "";
        alert("Category has been added");
      });
  }

  public addProduct() {
    if(!this.newProduct.category){
      alert("New Product Ctegory must be selected");
      return;
    }
    if(this.newProduct.price < 1 ){
      alert("New Product Price must be 1 or more");
      return;
    }
    if(this.newProduct.name.length < 3 ){
      alert("Product name must be at least 3 char");
      return;
    }
    if(!this.file){
      alert("You must choose an image for new product");
      return;
    }
    this.productsService.uploadProductImage(this.file)
      .subscribe((newFileName: String) => {
        this.newProduct.image = newFileName;
        this.productsService.addProduct(this.newProduct)
          .subscribe(addedProduct => {
            this.newProduct = new Product();
            this.file = undefined;
            this.redux.getState().allProducts.push(addedProduct);
            alert("Product has been added");
          });

      });
  }

  public setFile(e: any) {
    this.file = e.target.files[0];
  }

  public categorySelected() {
    this.productsToChose = this.redux.getState().allProducts
      .filter(p => {
        if (p.category == this.chosenCategory) return p;
      });
    this.productToEdit = new Product();
    this.chosenProduct = "";
  }

  public productSelected() {
    this.redux.getState().allProducts
      .find((p, index) => {

        if (p._id == this.chosenProduct) {
          this.oldProductIndex = index;
          this.productToEdit = p;
          return p;
        }
      });
  }

  public saveChanges() {
    const updatedProduct: Product = {...this.productToEdit};
    if (!this.file) {
      this.productsService.updateProduct(updatedProduct)
        .subscribe(info => {
          this.redux.getState().allProducts[this.oldProductIndex] = updatedProduct;
        });
    } else {
      this.productsService.uploadProductImage(this.file)
        .subscribe((newFileName: String) => {
          updatedProduct.image = newFileName;
          this.productsService.updateProduct(updatedProduct)
            .subscribe(info => {
              this.redux.getState().allProducts[this.oldProductIndex] = updatedProduct;
            });
        });
    }
    this.productToEdit = new Product();
    this.chosenProduct = "";
    this.chosenCategory = "";
  }

}
