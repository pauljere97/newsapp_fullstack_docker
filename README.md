# newsapp_fullstack_docker
RUN the following commands in the terminal
STEP 1: git clone https://github.com/pauljere97/newsapp_fullstack_docker.git
STEP 2: cd newsapp_fullstack_docker
STEP 3: cd frontend
STEP 4: npm install
STEP 5: cd.. && cd backend
STEP 6: composer install
step 7: cd ..
STEP 8: Turn on the Docker daemon and ensure that it is running
STEP 9: docker-composer up
STEP 10: create and copy the .env variables in the backend directory, the variables are shown below, line 19 to 88


<!-- 

APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:nBwPh+KAh46a/oNdYRlkZYHgj0+KYNwyeYR5Nmrz4fw=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mysql_db
DB_PORT=3306
DB_DATABASE=news_app_db
DB_USERNAME=root
DB_PASSWORD=root

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"



#NEWS ARTICLES APIS & KEYS
NEW_YORK_TIMES = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
NEW_YORK_TIMES_KEY = "EACnq6ElQSLrAj34iKkBduFqqKXcPUoz"
NEWS_API = "https://newsapi.org/v2/everything"
NEWS_API_KEY = "edc0f10b056c4f92b3b575e6c85ac06c"
G_NEWS = "https://gnews.io/api/v4/search"
G_NEWS_KEY = "70dbfc9b7ff5f38a916efa6bc5ce9a0a"
GUARDIAN_NEWS = "https://content.guardianapis.com/search"
GUARDIAN_NEWS_KEY = "9fa21726-d229-4247-b133-0a14b69d8339" 

-->