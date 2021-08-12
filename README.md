![Image of another](https://source.unsplash.com/EqPF4QT60j4)

### About

- this is a NO BS Quick Draw McCraw (couldn't find anything that rhymes with draw) Redis Setup guide!

### Getting Started

1. open terminal

2. cd Desktop (if you want to clone the repo on to your Desktop)

3. git clone repo https://github.com/grokkingcoding/redis-nodejs-express-setup.git

4. cd into the repo folder (the folder you just cloned)

5. run: npm i

6. run npm start

7. go to localhost:3333 = your app should be running

### Setting Up Redis

## Redis setup on macOS

1. which brew

2. brew update

3. brew install redis

4. brew services start redis (redis is now installed locally on your Mac)

5. redis-cli ping (afterwards, you should receive a message 'PONG' printed in your terminal - that means redis is running ok on your mac)

6. You would follow a similar procedure to instal redis on your server for example like a ec2 server

7. Next, we will setup an express app to act as a middle layer between the redis and mongodb on your machine.

8. The express app will need the following packages to interact with redis and mongodb on your machine: node-redis

9. redis is a key value pair store and if we use node-redis to get a value we can do this:

```
client.get(grokking”, (err, val) => console.log(val))
```

10. If you have set your grokking key to a value of 'coding', the console will print 'coding'.

11. To setup node-redis in express:

```

const redis = require("redis");
const redisUrl = ‘redis://127.0.0.1:6379’
const client = redis.createClient(redisUrl);

client.on("error", function(error) {
console.error(error);
});

client.set("key", "value", redis.print);
client.get("key", redis.print);

client.get("key", console.log);

```

12. Stringify the object before setting it into redis otherwise you will get back an object object when you try to get the key value again

13. And when we get back the value with do json parse

14. to promisify a function - import util from nodejs standard library

15. Then write this line of code in your index.js (refer to the index.js file):

```
client.get = util.promisify(client.get);
```

16. After doing that, we are turning the callback of the function into a promise instead

17. So now we can use something like this:

```
let data = await client.get(“some key”);
```
