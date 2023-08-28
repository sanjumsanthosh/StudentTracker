# i need to create a .env file with config
# DATABASE_URL="mysql://root:root@localhost:3306/school_db"

# collect data from user
# user name
# password
# database name

# create .env file

echo "Enter your database username: "
read username

echo "Enter your database password: "
read password

echo "Enter your database name: "
read database

echo "DATABASE_URL=mysql://$username:$password@localhost:3306/$database" > .env
echo "DATABASE_URL=mysql://$username:$password@host.docker.internal:3306/$database" > .env.docker
