import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PasswordHiddenPipe } from '../../core/pipes/password.hidden.pipe';

@Component({
  selector: 'app-show-data',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule,
    PasswordHiddenPipe,
  ],
  templateUrl: './show-data.component.html',
  styleUrl: './show-data.component.scss',
})
export class ShowDataComponent implements OnInit {
  storeData: any = [];
  copyUserData: any[];
  inputValue: string = '';

  itemsPerPageSize: number = 5;
  currentPage: number = 1;

  constructor(private service: HttpService, private router: Router) {
    this.copyUserData = this.storeData;
  }

  ngOnInit(): void {
    this.getDataFromApi();
  }

  getDataFromApi() {
    this.service.getData().subscribe((response: any) => {
      this.storeData = response;
      this.copyUserData = [...this.storeData];
    });
  }

  deleteData(id: number) {
    try {
      const shouldDeleted = window.confirm('Are you sure want to delete ');
      if (shouldDeleted) {
        this.copyUserData = this.storeData.filter(
          (data: any) => data.id !== id
        );

        this.service.deleteData(id, this.copyUserData).subscribe(() => {
          console.log('item deleted successfully');
        });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  goToEditDataPath(id: any) {
    this.router.navigate(['/edit', id]);
  }

  searchDataByName() {
    if (this.inputValue.trim() === '') {
      this.copyUserData = [...this.storeData];
    } else {
      this.copyUserData = this.storeData.filter((item: any) =>
        item.name.toLowerCase().includes(this.inputValue.toLowerCase())
      );
      this.currentPage = 1;
    }
  }

  markText(name: string): string {
    if (!this.inputValue.trim()) return name;
    const regex = new RegExp(this.inputValue, 'gi');

    return name.replace(
      regex,
      '<mark class="highlight text-black bg-warning fw-medium">$&</mark>'
    );
  }
}
