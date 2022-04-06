export const ReportsListResults = (reports, ... rest) => {
    const [selectedReports, setSelectedReports] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleSelectAll = (event) => {
        let newSelectedReports;

        if (event.target.checked) {
            newSelectedReports = reports.map((report) => report.id);
        } else {
            newSelectedReports = [];
        }

        setSelectedReports(newSelectedReports);
    }

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedReportIds.indexOf(id);
        let newSelectedReportIds = [];

        if (selectedIndex === -1) {
            newSelectedReportIds = newSelectedReportIds.concat(selectedReportIds, id);
        } else if (selectedIndex === 0) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
        }
    }
}

ReportsListResults.propTypes = {
    reports: PropTypes.array.isRequired
  };
  