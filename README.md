# A basic Django app with the Github API
* A simple app that consumes the JSON response of a simple GitHub API request.

## Installation

* Install [virtualenv](https://virtualenv.pypa.io/en/stable/) with the following command:
 
  ```sh
  $ pip install virtualenv
  ```
  
* Set up your development structure:
 
  ```sh
  $ mkdir YourProjectName
  $ cd YourProjectName
  $ virtualenv YourProjectEnv
  $ git clone git@github.com:ijajmulani/A-basic-Django-app-with-the-Github-API.git githubapi
  $ source YourProjectEnv/bin/activate
  $ cd githubapi
  ```
  
* Let’s get Django installed:
  ```sh
  $ pip install django
  ```
  
* Install request module:
  ```sh
  $ pip install request
  ```
  
* Install dateutil module for date conversion:
  ```sh
  $ pip install python-dateutil
  ```
 
 
* Launch the development server:
 
  ```
  $ python manage.py runserver
  ```
