# DB Indexes Demo

## Description

This project is an Express application integrated with TypeORM, aiming to showcase the functionality and usage of indexes in a MySQL database. The application comes with a set of migrations that create the necessary tables and indexes to demonstrate the benefits of optimizing query performance with indexes.

## Setup

To run the project locally, follow these steps:

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Create MySQL Database:**
   Create a MySQL database that will be used by the application. Make sure to configure the database connection details in the `.env` file.

3. **Create `.env` file:**
   Create a `.env` file in the root directory with the following content, replacing the placeholders with your database connection details:

   ```
   PORT=your_port
   DB_HOST=your_database_host
   DB_PORT=your_database_port
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

4. **Run Migrations:**
   Execute the following command to run the TypeORM migrations and set up the database tables and indexes:

   ```bash
   npm run migration:run
   ```

5. **Start the Application:**
   Run the following command to start the Express application:

   ```bash
   npm run start
   ```

   The application will be accessible at `http://localhost:3000`.

## Usage

With the project set up, you can explore the endpoints and queries defined in the application. Additionally, observe the database performance with and without the implemented indexes to understand their impact on query execution time.

## Results

#### Latency Analysis:

The following charts depict the query latency (response time) for the /search endpoint with parameters firstname=John&lastname=Do. The latency is measured in milliseconds (ms), providing insights into how quickly the database responds to queries under different levels of concurrent user load.

![Latency - 1 concurrent](https://i.imgur.com/MfeYFML.png)

![Latency - 10 concurrent](https://i.imgur.com/eBnqyQP.png)

![Latency - 100 concurrent](https://i.imgur.com/epOMKlb.png)

![Latency - 1000 concurrent](https://i.imgur.com/Gx4B2fO.png)

#### Throughput Analysis:

The throughput chart below illustrates the volume of data transferred in bytes over time. Throughput is a key metric for assessing the system's overall capacity and efficiency in handling a significant number of requests concurrently.

![Throughput](https://i.imgur.com/ll5KhtT.png)

#### Explain Query Result:

The result of the explain query for the search operation is as follows:

```json
[
  {
    "id": "1",
    "select_type": "SIMPLE",
    "table": "users",
    "type": "range",
    "possible_keys": "idx_lastname_firstname",
    "key": "idx_lastname_firstname",
    "key_len": "2044",
    "ref": null,
    "rows": "15654",
    "Extra": "Using where; Using index; Using filesort"
  }
]
```

### Index Creation Explanation

To enhance query performance and optimize the retrieval of data from the "users" table, an index named `idx_lastname_firstname` has been created. The index is designed to improve the efficiency of search operations on the "lastname" and "firstname" columns.

#### Combined Index for Firstname and Lastname

The decision to create a combined index for both "lastname" and "firstname" is based on the typical query patterns observed in the application. Creating a single index for both columns is done to speed up searches that involve both criteria at the same time.

#### Order Consideration: Lastname First for Better Cardinality

The order of columns in the index (`(lastname, firstname)`) is strategically chosen with consideration for better cardinality. Cardinality refers to the uniqueness of values in a column. In most scenarios, "lastname" tends to have higher cardinality than "firstname," meaning that there are typically more unique last names than first names. By placing "lastname" first in the index, we leverage this higher cardinality, allowing the database engine to narrow down the search more efficiently.

#### SQL Code for Index Creation

The following SQL code was used to create the index:

```sql
CREATE INDEX idx_lastname_firstname ON users (lastname, firstname);
```
