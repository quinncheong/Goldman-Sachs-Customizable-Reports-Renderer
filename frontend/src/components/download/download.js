import Head from 'next/head';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from 'next/link';
import { Box, Button, Container, Divider, Grid, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';

export const Download = ({setPageType, ...props}) => {
    const router = useRouter();

    const handleBackClick = () => {
        setPageType("generate");
    };

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
            <NextLink
                href="/"
                passHref
            >
                <Button
                component="a"
                endIcon={(<DownloadIcon fontSize="small" />)}
                sx={{ mt: 3 }}
                variant="contained"
                >
                Download
                </Button>
            </NextLink>
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