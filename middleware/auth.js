import {auth} from '~/plugins/firebase.js';
export default function({redirect}){
    auth.onAuthStateChanged((user) => {
        if (!user) {
          return redirect('/login');
        } else {
          console.log(user);
        }
      });
}