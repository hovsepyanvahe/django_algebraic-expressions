# Algebraic Expressions

This project is a Django application that uses Docker Compose for easy setup and management of the development environment. Follow these simple steps to get started.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/hovsepyanvahe/django_algebraic_expressions.git
    cd django_algebraic_expressions
    ```

2. **Run Docker Compose:**

    ```bash
    docker-compose up
    ```

    This command will build the Docker images and start the containers. You can add the `-d` flag to run it in the background.

3. **Access the Application:**

    Once the containers are up and running, you can access the Django application at [http://localhost:8000](http://localhost:8000).

4. **Run Tests:**

    ```bash
    python manage.py test
    ```

    To run tests, make sure the Docker containers are running.

## Optional: Custom Start Script

If you find yourself running tests frequently, you can create a custom start script.

1. Modify the file named `start.sh` in the project root.

2. Add the following content:

    ```bash   
    # Run Django tests
    python manage.py test
    ```
