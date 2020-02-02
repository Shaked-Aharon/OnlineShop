export default  {
    initialRedux: (user: any) => {
        this.redux.getState().currentUser = user.currentUser;
        this.redux.getState().loggedIn = true;
        this.redux.getState().admin = user.isAdmin;
        this.redux.getState().searchOn = false;
        this.redux.getState().loading = false;
    }
}

