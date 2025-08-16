import { RouterProvider, createBrowserRouter ,Navigate} from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Layout from './Layout';
import SignedIn from './components/SignedIn'
import UserProfile from './components/UserProfile';
import AuthorProfile from './components/AuthorProfile';
import AddArticle from './components/AddArticle';
import Article from './components/Article';
import AuthorArticles from './components/AuthorArticles';
import ViewArticles from './components/ViewArticles';
import Admin from './components/Admin';
import AdAuthorDetails from './components/AdAuthorDetails';
import AdUsersDetails from './components/AdUsersDetails';
import AdAuthorArticles from './components/AdAuthorArticles';

function App() {
  let router= createBrowserRouter([
    {
      path:'',
      element:<Layout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/signup',
          element:<SignUp/>
        },
        {
          path:'/signin',
          element:<SignIn/>,
          
        },
        {
          path:'/signedin',
          element:<SignedIn/>
        },
        {
          path:'/user-profile',
          element:<UserProfile/>,
          children:[
            {
              path:'/user-profile/articles',
              element:<ViewArticles/>
            },
            {
              path:'/user-profile/articles/:articleId',
              element:<Article/>
            },
            {
              path:'',
              element:<Navigate to='/user-profile/articles' />
            }
          ]
        },
        {
          path:'/author-profile',
          element:<AuthorProfile/>,
          children:[
          
            {
              path:'/author-profile/add-article',
              element:<AddArticle/>
            },
            {
              path:'/author-profile/author-articles/:author',
              element:<AuthorArticles/>
            },
            {
              path:'/author-profile/articles/:articleId',
              element:<Article/>
            },
            {
                path:'',
                element:<Navigate to='/author-profile/author-articles/:author' />
              }
          ]
        },
        {
          path:'/admin-profile',
          element:<Admin/>,
          children:[
            {
              path:'/admin-profile/authors',
              element:<AdAuthorDetails/>
            },
            {
              path:'/admin-profile/users',
              element:<AdUsersDetails/>
            },
            {
              path:'/admin-profile/authors/articles',
              element:<AdAuthorArticles/>
            },
            {
              path:'',
              element:<Navigate to='/admin-profile/authors'/>
            }
          ]
        }
        
      ]
    }

  ])


  const fallbackElement='hello '
  return (
    <div>
    <RouterProvider router={router} fallbackElement={fallbackElement}  />
    </div>
  );
}

export default App;
