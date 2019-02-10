import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthGuardService } from './services/auth-guard.service';

const fallBackRoute: Route = {
  path: "**",
  component: PageNotFoundComponent
}

const indexRoute: Route = {
  path: "",   redirectTo: "/home", pathMatch: "full"
}

const routes: Routes = [
	{ path: "home", component: HomeComponent },
	{ path: "register", component: RegisterComponent },
	{ path: "login", component: LoginComponent },
  { path: 'dashboard', canActivate: [AuthGuardService], loadChildren: './dashboard/dashboard.module#DashboardModule' },
	indexRoute,
  fallBackRoute
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
