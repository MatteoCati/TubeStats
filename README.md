# TubeStats

Live version [here](https://tube-stats.herokuapp.com).

TubeStats is a website that allows you to find the most recent statistics about YouTube.

![alt text](https://github.com/MatteoCati/TubeStats/blob/main/docs/topChannels.PNG)

You can also get some details avout your favourite channels, such as vies, like and number of comments for recent videos and most popular videos of the channel.

![alt text](https://github.com/MatteoCati/TubeStats/blob/main/docs/recentVideos.PNG)

## Local Installation

To install this project, you can clone this repository. Then, you will need to setup both the frontend and the backend as described below.

### Backend

Install the required packages using npm:


> npm install

Then, you will need to create a `.env` file containing the following environment variables:

-   PORT: the port to be used by the backend. If no key is provided, the default will be 4000
-   YOUTUBE_API_KEY: the secret key used to access the youtube API. You will need to generate one from the <a href="https://console.cloud.google.com/apis/dashboard?project=tubestats-356421">Google Developer Console</a>.

Here is an example of what should be contained in the file:

```
PORT=4000
YOUTUBE_API_KEY=my-secret-api-key
```

Finally, you can execute the following command to start the backend:

> npm run dev

### Frontend

To start the frontend, go in the frontend folder and install the required libraries:

> cd frontend

> npm install

After the installation has finished, you may need to change the `proxy` value in package.json to match the port value chosen in the backend `.env` file.

Lastly, start the react app:

> npm start

This will start the website, which will be available at `http://localhost:3000`.
