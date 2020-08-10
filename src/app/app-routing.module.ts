import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './pages/blog/blog.component';
import { AdminBlogComponent } from './pages/admin-blog/admin-blog.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'blog'},
  { path: 'blog', component: BlogComponent },
  { path: 'adminBlog', component: AdminBlogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
