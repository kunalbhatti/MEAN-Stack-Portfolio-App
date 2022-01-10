Technology Used: MEAN Stack + Ionic Framework. 
Deployment: Heroku
Video Link: https://youtu.be/VwE6EzBNlJM
Inspiration: I wanted to build a platform for displaying development projects.

Features Added:

Project Management: 
- Give option to view, create, update and delete projects.
- Each project can display the following information 
   -- Name 
   -- Technology Used
   -- Short Description 
   -- Github link
   -- Preview link (Deployment link)
   -- Thumbnail
   -- Video
- Assets are stored on the server. The video is directly streamed from the server
- The assets are stored as files and not as blob data 

Messaging System: 
- Give option to send message to the admin from the profile page
- Create an unread message notification when the admin logs in
- Admin can reply (using SendGrid API) directly to the sender from the admin panel
