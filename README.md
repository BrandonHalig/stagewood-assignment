This is web app created with React to search for events on an SQL database


Steps to install


Step 1.) Setup the SQL DataBase on cPanel:

    1.) Within cPanel create a new MySQL Database and MySQL user
    2.) Open phpMyAdmin, go to import, then import seed.sql
    3.) Update the header variables in eventdata.php with the credentials and database name you came up with



Step 2.) Upload Build Files to cPanel File Manager:

    1.) Using the application build files, send them to a zip file
    2.) Open file manager on cPanel and open the public_html folder
    3.) upload then extract the files in the public_html folder
    4.) create a folder in "public_html" called "php" then upload eventdata.php to that folder
    5.) create a folder in "public_html" "event" and upload the build zip file to that folder and extract it

Web app should work after these steps are completed
