# Wooclap App

Wooclap App is a Node app.

## Installation

Use the following CLI to install dependencies.

```bash
npm install
```
or
```bash
yarn
```

## Setting up MongoDB Atlas

Go ahead and [create an account on MongoDB Atlas](https://www.mongodb.com/download-center). Once you’re done, you need to create an “Organization”. It’s sort of like a company name. You can name it anything you want. (You can change it later).

You also need to select a cloud service. Go ahead with MongoDB Atlas in this case.

Next, you need to set permissions for users. MongoDB Atlas will automatically fill up your current email address as the user. So just continue to the next step.

Next, you need to create a Database in MongoDB Atlas. There are several steps to do this.

First, you need to create a new Project. You can do this by going under “Context” in the top left hand menu. Click the Dropdown. Then, select New Project.

Next, you will need to name your project. Call it anything you want. I’m going to call this wooclapp.

Then, you will need to add members. Again, you’re already added so go ahead and click “Create Project” to move on.

You should end up with a screen that says Create a Cluster.

Click on “Build a Cluster”. (Free version)

Click on Create cluster next. You should see “Your cluster is being created”.

You have to wait for approximately 5 minutes for the cluster creation.


## Connecting to MongoDB Atlas

Click on the Connect button, a modal should pop up.

Then whitelist your IP address before you can connect to your cluster.

Next, you need to create a MongoDB user. This username and password is different from the one you used to login to MongoDB Atlas. This username and password is used ONLY for the database.

Make sure you remember MongoDB user and password.

Next, click on choose your connection method. Select “Connect to your application” and copy the connection string.

The connection string should look something like this:
```
'mongodb+srv://<username>:<password>@<clustername>-rmp3c.mongodb.net/test?retryWrites=true&w=majority'
```

You need to replace 2 things here:

Replace <username> with your Database username
Replace <password> with the Database user’s password (dont keep the brackets)

## Usage

```python
npm run start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)