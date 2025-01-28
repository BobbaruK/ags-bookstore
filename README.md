# AGs Bookstore

**AGs Bookstore** is a modern web application that allows users to explore a vast collection of books, filter and sort them according to various criteria, and add desired titles to their shopping cart. Administrators have full **Create**, **Read**, **Update**, and **Delete** (CRUD) capabilities to manage the book inventory.

## Features

- **Authentication**: Secure email/password login and OAuth integration.
- **Authorization**: Role-based access control and permission management.
- **Password Management**: Password reset with token-based validation.
- **Responsive UI**: Built with ShadCN UI (powered by Radix) and Tailwind CSS for an accessible and responsive interface.
- **Dark Mode**: Seamless dark mode integration using `next-themes`.
- **Form Handling**: Robust validation with React Hook Form and Zod.
- **Email Services**: Integration with [Resend](https://resend.com/) for transactional emails.
- **Theming**: Tailwind CSS with utility-first principles and animations.
- **Database**: Utilizes PostgreSQL for relational data storage, managed efficiently with Prisma ORM.

## Tech Stack

### **Frontend**

- [Next.js 15](https://nextjs.org/) with Turbopack for optimized performance.
- [React 19](https://react.dev/) for UI development.
- [Tailwind CSS](https://tailwindcss.com/) for modern, responsive styling.
- [ShadCN UI](https://shadcn.dev/) leveraging [Radix](https://www.radix-ui.com/) for accessible and customizable components.

### **Authentication & Authorization**

- [Auth.js](https://authjs.dev/) for flexible authentication strategies.
- [Prisma](https://www.prisma.io/) as the ORM for database interactions.
- [PostgreSQL](https://www.postgresql.org/) as the relational database.

### **Backend**

- Server-side actions using Next.js "use server" paradigm.
- Centralized business logic with Zod schemas and utility methods.

### **Utilities**

- [React Hook Form](https://react-hook-form.com/) for form management.
- [Zod](https://zod.dev/) for schema validation.
- [Lucide React](https://lucide.dev/) for modern, customizable icons.

### **Development Tools**

- [TypeScript](https://www.typescriptlang.org/) for type safety.
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for code quality.
- Tailwind Prettier plugin for consistent styling.

## Database Management

Auth App relies on PostgreSQL for its database, leveraging Prisma ORM for seamless schema migrations and type-safe queries. With Docker, managing the database lifecycle, including backups and restores, is streamlined.

- **Backup**: Includes scripts for backing up entire databases or specific ones, with compression options like `gzip`, `brotli`, or `bzip2`.
- **Restore**: Simple restoration commands are available for both entire dumps and specific databases.

## Progress and Key Achievements

1. **Core Features Implemented:**

   - Built a fully functional **navigation bar** with links to:
     - **Books Page**: Displays a searchable list of books with details like title, author, price, and an "Add to Cart" button.
     - **User Profile Page**: Allows users to update their personal information, including first name, last name, email (with validation) and 2FA.
   - Developed a **shopping cart**:
     - Always visible as a sidebar for better user experience.
     - Displays a list of selected books, quantities, and the total price.
     - Includes features to remove books.
   - Created a **search bar** for books:
     - Dynamically updates results based on user input.

2. **UI/UX Enhancements:**

   - Integrated **dynamic avatar rendering** on the User Profile Page, displaying user initials (e.g., "John Doe" → "JD").
   - Designed a clean, responsive interface with **Tailwind CSS** for mobile and desktop users.

3. **Backend Integration:**
   - Implemented database management using **PostgreSQL** for reliable and scalable data storage.
   - Used **Prisma ORM** to efficiently interact with the database and handle data operations.
   - Ensured seamless integration between the backend and frontend for features like managing user profiles and authors and books data.

### Trade-offs and Considerations:

- Prioritized core functionalities over optional features like stock management, but added comprehensive **error handling for edge cases**, ensuring a stable and robust system.
- Left room for enhancements like:
  - Further accessibility improvements beyond those provided by ShadCN UI.
  - Unit and integration testing for critical paths.
  - More advanced stock and inventory management systems.

## Getting Started

1. Set the env file in the root of the project - there is a sample [here](./.env.sample)
2. Set the env file in the frontend app (webapp) - there is a sample [here](/webapp/.env.sample)

3. Run the server:

Development

```bash
docker compose -f docker-compose.dev.yml up --watch
```

Production Without Multistage

```bash
docker compose -f docker-compose.docker-compose.prod-without-multistage.yml up
```

Production

```bash
docker compose -f docker-compose.docker-compose.prod.yml up
```

## Backup and restore postgres databeses in docker

All DBs

```sh
docker exec -t your-db-container pg_dumpall -c -U db_user > dump_`date +%Y-%m-%d"_"%H_%M_%S`.sql
```

Specific DB

```sh
docker exec -t your_db_container pg_dump -U db_user db_name --clean > dump_db_name_`date +%Y-%m-%d"_"%H_%M_%S`.sql
```

### gzip

All DBs

```sh
docker exec -t your-db-container pg_dumpall -c -U db_user | gzip > dump_`date +%Y-%m-%d"_"%H_%M_%S`.sql.gz
```

Specific DB

```sh
docker exec -t your-db-container pg_dump -U db_user db_name | gzip > dump_db_name_`date +%Y-%m-%d"_"%H_%M_%S`.sql.gz
```

### brotli or bzip2

All DBs

```sh
docker exec -t your-db-container pg_dumpall -c -U db_user | brotli --best > dump_`date +%Y-%m-%d"_"%H_%M_%S`.sql.br
```

Specific DB

```sh
docker exec -t your-db-container pg_dump -U db_user db_name | brotli > dump_db_name_`date +%Y-%m-%d"_"%H_%M_%S`.sql.br
```

All DBs

```sh
docker exec -t your-db-container pg_dumpall -c -U db_user | bzip2 --best > dump_`date +%Y-%m-%d"_"%H_%M_%S`.sql.bz2
```

Specific DB

```sh
docker exec -t your-db-container pg_dump -U db_user db_name | bzip2 > dump_db_name_`date +%Y-%m-%d"_"%H_%M_%S`.sql.bz2
```

### Restore

All DBs

```sh
cat your_dump.sql | docker exec -i your-db-container psql -U db_user
```

Specific DB

```sh
cat your_dump.sql | docker exec -i your-db-container psql -U db_user -d db_name
```
