# UberBusApp

## Stacks

1. React
2. Python

## Steps to run application in local

1. Clone project
```bash
git clone https://github.com/Maheshwari-Priyanka/UberBusApp.git
```

2. React in local

```bash
cd client/uber-bus-app
```

```bash
npm install
```

```bash
npm build
```

3. Python in local

```bash
cd uberbe
```

```bash
python3 uber.py
```

4. Access react app at http://localhost:3000/

## Steps to access application using Elastic IP address

1. Run terraform file

```bash
cd terraform
```
```bash
terraform init
terraform plan
terraform apply
```

2. Access the application at http://`<Elastic IP>`:80
