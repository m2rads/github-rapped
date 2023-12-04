import { NextApiRequest, NextApiResponse } from "next"
import { Octokit } from "@octokit/core"

const octokit = new Octokit({auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN})