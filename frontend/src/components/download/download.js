import Head from 'next/head';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from 'next/link';
import { Box, Button, Container, Divider, Grid, Typography, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import HomeIcon from '@mui/icons-material/Home';
import { teal } from "@mui/material/colors";

export const Download = ({setPageType, reportUrl, ...props}) => {
    const [downloadReady, setDownloadReady] = useState(false)
    const router = useRouter();

    const handleBackClick = () => {
        setPageType("generate");
    };

    useEffect(() => {
        if (reportUrl) {
            setDownloadReady(true);
        } else { setDownloadReady(false); }
    }, [reportUrl])

    return <>
        <Head>
            <title>
            Download Report
            </title>
        </Head>
        <Box
        component="main"
        sx={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            minHeight: '100%'
        }}
        >
        <Container maxWidth="md">
            <Typography sx={{ mb: 3 }} variant="h4">
                <IconButton onClick={handleBackClick} sx={{ ml: 1 }}>
                <ArrowLeftIcon size="lg" />
                </IconButton>
                Download Report
            </Typography>
            <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
            }}
            >
            <Typography
                align="center"
                color="textPrimary"
                variant="h1"
            >
                View your report here
            </Typography>

            {/* <NextLink
                href={reportUrl}
                passHref
            > */}
                

            <Box>
                <Button
                    component="a"
                    endIcon={(<DownloadIcon fontSize="small" />)}
                    sx={{ 
                        mt: 3, 
                        mx: 1, 
                        backgroundColor: teal[500],
                        maxWidth: "150px",
                        maxHeight: "40px",
                        minWidth: "150px",
                        minHeight: "40px",}}
                        variant="contained"
                    disabled={!downloadReady}
                    onClick={() => {window.location.href = reportUrl}}>
                Download
                </Button>

                <Button
                variant="outlined"
                sx={{
                    mt: 3,
                    mx: 1,
                    maxWidth: "150px",
                    maxHeight: "40px",
                    minWidth: "150px",
                    minHeight: "40px",
                    }}
                    endIcon={(<HomeIcon fontSize="small" />)}
                    onClick={(e) => setPageType("home")}
                >
                    Home
                </Button>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
                <img
                alt="Under development"
                src="/static/images/download.png"
                style={{
                    marginTop: 30,
                    display: 'inline-block',
                    maxWidth: '100%',
                    width: 500
                }}
                />
            </Box>
            </Box>
        </Container>
        </Box>
    </>
    };