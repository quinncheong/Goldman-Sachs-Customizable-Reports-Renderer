import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";


const Download = () => {
    const downloadFile = () => {
        const link = document.createElement("a");
        link.download = `download.txt`;
        link.href = "./download.txt";
        link.click();
    }

    const downloadModal = () => {
        return (
            <>
                <Button onClick={downloadFile} variant="contained" color="primary">
                    Download
                </Button>
            </>
        );
    }

  return (
    <>
        {downloadModal()}
    </>
  );
};

Download.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Download;
