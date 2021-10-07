Website: https://photoit.netlify.app

## Developers
---
* **Back-End Developer:** &nbsp; Sergio Inzunza
* **Front-End Developer:** &nbsp; Johnny Vo
* **Back-End Developer:** &nbsp; Ernie Hung
---
# PhotoIt
PhotoIt is a dark themed photo sharing web application where users can post photos to share with friends, family, and even the public to see. Unlike many other photo sharing apps like instagram, PhotoIt will have a certain set of categories, but will only be limited to them. Under these categories will be the posts of the week filtered by most liked.

* Users can register on the website with a username and password to make a profile
* Users can navigate to certain categories (displayed on the homepage) that spark their interest
* Users can upload photos under a certain category for the public to see.
* Users can comment on these posts
* Users can like other users pictures
* Users can visit other user's profiles
* When a picture is liked, appreciation points will be given to the user who uploaded the photo
* A user with the most appreciation points for a given week will be given an award icon
* Users can navigate through the top 3 appreciated users of the week via the "Appreciated" page.
* Pictures with high amount of likes would be shown first
* Admins can delete categories and pictures
* Admins can change passwords, update

---
## Technology
The PhotoIt codebase is seperated into a front-end and a back-end.
### Front-end
* HTML
* CSS
* JavaScript

Front-end was built using pure HTML, CSS, and Javascript. The scope of the project was very limited, so we wanted utilize these simple languages to its maximum potential. If the development period was longer, we would have definitely looked into migrating towards ReactJS as a base for our platform.


### Back-end
* JavaScript
    * Node JS
    * Express
* Google Firebase

The Back-end was built using Node JS as the web-server. To handle requests the express framework was used. The database chosen was Google Firebase, as we had experience with it and felt it was the easiest to work with. The majority of the Firebase interaction was done on the Back-end, with only user authentication being done on the Front-end.
