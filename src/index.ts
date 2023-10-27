#! /usr/bin/env node
import { Command } from 'commander'

const program = new Command();

program
    .command('generate')
    .description("Generated flourish data based on datasets from dane.gov.pl")
    .parse()
