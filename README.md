<div align="center">
  <img src="images/logo.png" alt="Logo">

  <p align="center">
    This outlines the codebase of our submission for Goldmans Sachs Engineering Engage 2021 Hackathon
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

### Customisable Report Rendering
To design a system that streamlines the report generation process by having a highly customizable, scalable, intuitive and automated report rendering solution.

<div align="center">
  <img src="images/dashboard.png" alt="Dashboard" width="70%">
</div>

## Built With

### Frontend
* [Material UI](https://mui.com/)
* [React](https://reactjs.org/)

### API 
* [ExcelWriter](https://xlsxwriter.readthedocs.io/index.html#)
* [FastAPI](https://fastapi.tiangolo.com/)
* [Pandas](https://pandas.pydata.org/)
* [Python](https://python.org/)

### Backend
* [Java Spring Boot](https://spring.io/)

## Our Solution
![Setup](images/setup.gif)
> Setting up a project

![Naming](images/naming.gif)
> File and sheets naming

![Drag and drop](images/dnd.gif)
> Drag and drop capabilities for organising tables on a sheet

![Column selection](images/columns.gif)
> Selecting columns for each respective table 

![Output](images/output.gif)
> Output Excel Report

### Architecture
<div align="center">
  <img src="images/sa.png" alt="Logo">
</div>
  
### Performance 

Measured on a t2-medium AWS EC2 instance (4gb RAM, 30gb Memory)

|   | Small Report (10 Rows x 1 Column) | Medium Report (5 Rows x 5 Columns) | Large Report (10 Rows x 10 Columns) |
| ------------------------ | ------------------------ | ------------------------ | ------------------------ |
| 10 Concurrent Reports | 0.85s | 38.72s | 137s |
| 1000 Concurrent Reports | 14.03s | 173s | 13mins |

* Concurrent load scales well with small-sized, single sheet reports
* Considerable load scalability with medium-sized reports

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Ian Chia](https://github.com/theianchia)
* [Joel Lim](https://github.com/joellje)
* [Jonathan Tan](https://github.com/jonathantan1425)
* [Quinn Cheong](https://github.com/quinncheong)

<p align="right">(<a href="#top">back to top</a>)</p>


