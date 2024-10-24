"use client";

import * as React from "react";
import {
   Bar,
   BarChart,
   Line,
   LineChart,
   ResponsiveContainer,
   XAxis,
   YAxis,
} from "recharts";
import { CheckCircle2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from "@/components/ui/chart";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";

// Mock data based on the provided JSON
const overallScores = [
   { name: "Financial", score: 80 },
   { name: "Risk Assessment", score: 90 },
   { name: "Overall", score: 85 },
];

const financialAnalysis = [
   { name: "Avg Quote", value: 90860 },
   { name: "Max Quote", value: 90860 },
   { name: "Min Quote", value: 90860 },
];

const riskAssessmentData = [
   { factor: "Data Security", score: 95 },
   { factor: "Infrastructure", score: 90 },
   { factor: "Payment Terms", score: 70 },
];

const monthlyTrends = [
   { month: "Jan", proposals: 3, avgScore: 82 },
   { month: "Feb", proposals: 5, avgScore: 78 },
   { month: "Mar", proposals: 2, avgScore: 85 },
   { month: "Apr", proposals: 7, avgScore: 80 },
   { month: "May", proposals: 4, avgScore: 88 },
   { month: "Jun", proposals: 6, avgScore: 85 },
];

const proposalDetails = [
   {
      id: "PROP001",
      company: "TEAM SOLUTIONS",
      totalPrice: 90860,
      riskScore: 90,
      overallScore: 85,
   },
];

export function DashboardLayout() {
   return (
      <div className='flex-col md:flex'>
         <div className='flex-1 space-y-4 p-8 pt-6'>
            <div className='flex items-center justify-between space-y-2'>
               <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
               <div className='flex items-center space-x-2'>
                  <Button>Download Report</Button>
               </div>
            </div>
            <Tabs defaultValue='overview' className='space-y-4'>
               <TabsList>
                  <TabsTrigger value='overview'>Overview</TabsTrigger>
                  <TabsTrigger value='analytics'>Analytics</TabsTrigger>
                  <TabsTrigger value='reports'>Reports</TabsTrigger>
               </TabsList>
               <TabsContent value='overview' className='space-y-4'>
                  <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                     <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                           <CardTitle className='text-sm font-medium'>
                              Total Proposals
                           </CardTitle>
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              className='h-4 w-4 text-muted-foreground'
                           >
                              <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                              <circle cx='9' cy='7' r='4' />
                              <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                           </svg>
                        </CardHeader>
                        <CardContent>
                           <div className='text-2xl font-bold'>1</div>
                           <p className='text-xs text-muted-foreground'>
                              +0% from last month
                           </p>
                        </CardContent>
                     </Card>
                     <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                           <CardTitle className='text-sm font-medium'>
                              Average Quote
                           </CardTitle>
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              className='h-4 w-4 text-muted-foreground'
                           >
                              <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                           </svg>
                        </CardHeader>
                        <CardContent>
                           <div className='text-2xl font-bold'>$90,860</div>
                           <p className='text-xs text-muted-foreground'>
                              +0% from last month
                           </p>
                        </CardContent>
                     </Card>
                     <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                           <CardTitle className='text-sm font-medium'>
                              Best Overall Score
                           </CardTitle>
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              className='h-4 w-4 text-muted-foreground'
                           >
                              <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                           </svg>
                        </CardHeader>
                        <CardContent>
                           <div className='text-2xl font-bold'>85%</div>
                           <p className='text-xs text-muted-foreground'>
                              TEAM SOLUTIONS
                           </p>
                        </CardContent>
                     </Card>
                     <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                           <CardTitle className='text-sm font-medium'>
                              Risk Assessment
                           </CardTitle>
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              className='h-4 w-4 text-muted-foreground'
                           >
                              <path d='M12 12v.01M19.071 4.929c-1.562-1.562-3.88-2.121-5.971-1.44-2.09.68-3.76 2.35-4.44 4.44-.68 2.09-.12 4.41 1.44 5.97 1.562 1.562 3.88 2.121 5.971 1.44 2.09-.68 3.76-2.35 4.44-4.44.68-2.09.12-4.41-1.44-5.97' />
                              <path d='M4.929 19.071c1.562 1.562 3.88 2.121 5.971 1.44 2.09-.68 3.76-2.35 4.44-4.44.68-2.09.12-4.41-1.44-5.97-1.562-1.562-3.88-2.121-5.971-1.44-2.09.68-3.76 2.35-4.44 4.44-.68 2.09-.12 4.41 1.44 5.97' />
                           </svg>
                        </CardHeader>
                        <CardContent>
                           <div className='text-2xl font-bold'>Low</div>
                           <p className='text-xs text-muted-foreground'>
                              Strong security measures
                           </p>
                        </CardContent>
                     </Card>
                  </div>
                  <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                     <Card className='col-span-4'>
                        <CardHeader>
                           <CardTitle>Overall Scores</CardTitle>
                        </CardHeader>
                        <CardContent className='pl-2'>
                           <ChartContainer
                              config={{
                                 score: {
                                    label: "Score",
                                    color: "hsl(var(--chart-1))",
                                 },
                              }}
                              className='h-[200px]'
                           >
                              <ResponsiveContainer width='100%' height='100%'>
                                 <BarChart data={overallScores}>
                                    <XAxis
                                       dataKey='name'
                                       stroke='#888888'
                                       fontSize={12}
                                       tickLine={false}
                                       axisLine={false}
                                    />
                                    <YAxis
                                       stroke='#888888'
                                       fontSize={12}
                                       tickLine={false}
                                       axisLine={false}
                                       tickFormatter={(value) => `${value}%`}
                                    />
                                    <ChartTooltip
                                       content={<ChartTooltipContent />}
                                    />
                                    <Bar
                                       dataKey='score'
                                       fill='var(--color-score)'
                                       radius={[4, 4, 0, 0]}
                                    />
                                 </BarChart>
                              </ResponsiveContainer>
                           </ChartContainer>
                        </CardContent>
                     </Card>
                     <Card className='col-span-3'>
                        <CardHeader>
                           <CardTitle>Financial Analysis</CardTitle>
                           <CardDescription>
                              Breakdown of financial metrics
                           </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <ChartContainer
                              config={{
                                 value: {
                                    label: "Value",
                                    color: "hsl(var(--chart-1))",
                                 },
                              }}
                              className='h-[200px]'
                           >
                              <ResponsiveContainer width='100%' height='100%'>
                                 <LineChart data={financialAnalysis}>
                                    <XAxis
                                       dataKey='name'
                                       stroke='#888888'
                                       fontSize={12}
                                       tickLine={false}
                                       axisLine={false}
                                    />
                                    <YAxis
                                       stroke='#888888'
                                       fontSize={12}
                                       tickLine={false}
                                       axisLine={false}
                                       tickFormatter={(value) => `$${value}`}
                                    />
                                    <ChartTooltip
                                       content={<ChartTooltipContent />}
                                    />
                                    <Line
                                       type='monotone'
                                       dataKey='value'
                                       stroke='var(--color-value)'
                                       strokeWidth={2}
                                    />
                                 </LineChart>
                              </ResponsiveContainer>
                           </ChartContainer>
                        </CardContent>
                     </Card>
                  </div>
                  <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                     <Card className='col-span-4'>
                        <CardHeader>
                           <CardTitle>Proposal Analysis</CardTitle>
                           <CardDescription>TEAM SOLUTIONS</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className='space-y-8'>
                              <div className='flex items-center'>
                                 <span className='text-2xl font-bold'>
                                    Pros
                                 </span>
                              </div>
                              <ul className='grid gap-3 text-sm'>
                                 <li className='flex items-center'>
                                    <CheckCircle2 className='mr-2 h-4 w-4 text-green-500' />
                                    Includes cloud setup service
                                 </li>
                                 <li className='flex items-center'>
                                    <CheckCircle2 className='mr-2 h-4 w-4 text-green-500' />
                                    Provides initial training and admin user
                                    rights training
                                 </li>
                                 <li className='flex items-center'>
                                    <CheckCircle2 className='mr-2 h-4 w-4 text-green-500' />
                                    Offers a highly secure data environment
                                 </li>
                              </ul>
                              <div className='flex items-center'>
                                 <span className='text-2xl font-bold'>
                                    Cons
                                 </span>
                              </div>
                              <ul className='grid gap-3 text-sm'>
                                 <li className='flex items-center'>
                                    <XCircle className='mr-2 h-4 w-4 text-red-500' />
                                    100% advance payment required
                                 </li>
                                 <li className='flex items-center'>
                                    <XCircle className='mr-2 h-4 w-4 text-red-500' />
                                    Higher total price compared to the
                                    requirement
                                 </li>
                                 <li className='flex items-center'>
                                    <XCircle className='mr-2 h-4 w-4 text-red-500' />
                                    Limited flexibility in payment terms
                                 </li>
                              </ul>
                           </div>
                        </CardContent>
                     </Card>
                     <Card className='col-span-3'>
                        <CardHeader>
                           <CardTitle>Risk Assessment</CardTitle>
                           <CardDescription>
                              Evaluation of potential risks
                           </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <ChartContainer
                              config={{
                                 score: {
                                    label: "Score",
                                    color: "hsl(var(--chart-1))",
                                 },
                              }}
                              className='h-[200px]'
                           >
                              <ResponsiveContainer width='100%' height='100%'>
                                 <BarChart
                                    data={riskAssessmentData}
                                    layout='vertical'
                                 >
                                    <XAxis
                                       type='number'
                                       domain={[0, 100]}
                                       hide
                                    />
                                    <YAxis
                                       dataKey='factor'
                                       type='category'
                                       width={100}
                                    />
                                    <ChartTooltip
                                       content={<ChartTooltipContent />}
                                    />
                                    <Bar
                                       dataKey='score'
                                       fill='var(--color-score)'
                                       radius={[0, 4, 4, 0]}
                                    />
                                 </BarChart>
                              </ResponsiveContainer>
                           </ChartContainer>
                        </CardContent>
                     </Card>
                  </div>
               </TabsContent>

               <TabsContent value='analytics' className='space-y-4'>
                  <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-8'>
                     <Card className='col-span-4'>
                        <CardHeader>
                           <CardTitle>Monthly Trends</CardTitle>
                           <CardDescription>
                              Number of proposals and average scores over time
                           </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <ChartContainer
                              config={{
                                 proposals: {
                                    label: "Proposals",
                                    color: "hsl(var(--chart-1))",
                                 },
                                 avgScore: {
                                    label: "Avg Score",
                                    color: "hsl(var(--chart-2))",
                                 },
                              }}
                              className='h-[300px]'
                           >
                              <ResponsiveContainer width='100%' height='100%'>
                                 <LineChart data={monthlyTrends}>
                                    <XAxis dataKey='month' />
                                    <YAxis yAxisId='left' />
                                    <YAxis
                                       yAxisId='right'
                                       orientation='right'
                                    />
                                    <ChartTooltip
                                       content={<ChartTooltipContent />}
                                    />
                                    <Line
                                       yAxisId='left'
                                       type='monotone'
                                       dataKey='proposals'
                                       stroke='var(--color-proposals)'
                                       strokeWidth={2}
                                    />
                                    <Line
                                       yAxisId='right'
                                       type='monotone'
                                       dataKey='avgScore'
                                       stroke='var(--color-avgScore)'
                                       strokeWidth={2}
                                    />
                                 </LineChart>
                              </ResponsiveContainer>
                           </ChartContainer>
                        </CardContent>
                     </Card>
                     <Card className='col-span-4'>
                        <CardHeader>
                           <CardTitle>Proposal Distribution</CardTitle>
                           <CardDescription>
                              Distribution of proposals by score range
                           </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <ChartContainer
                              config={{
                                 count: {
                                    label: "Count",
                                    color: "hsl(var(--chart-3))",
                                 },
                              }}
                              className='h-[300px]'
                           >
                              <ResponsiveContainer width='100%' height='100%'>
                                 <BarChart
                                    data={[
                                       { range: "0-20", count: 0 },
                                       { range: "21-40", count: 0 },
                                       { range: "41-60", count: 0 },
                                       { range: "61-80", count: 0 },
                                       { range: "81-100", count: 1 },
                                    ]}
                                 >
                                    <XAxis dataKey='range' />
                                    <YAxis />
                                    <ChartTooltip
                                       content={<ChartTooltipContent />}
                                    />
                                    <Bar
                                       dataKey='count'
                                       fill='var(--color-count)'
                                    />
                                 </BarChart>
                              </ResponsiveContainer>
                           </ChartContainer>
                        </CardContent>
                     </Card>
                  </div>
                  <Card>
                     <CardHeader>
                        <CardTitle>Key Metrics Comparison</CardTitle>
                        <CardDescription>
                           Comparison of important metrics across proposals
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <Table>
                           <TableHeader>
                              <TableRow>
                                 <TableHead>Metric</TableHead>
                                 <TableHead>TEAM SOLUTIONS</TableHead>
                                 <TableHead>Industry Average</TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              <TableRow>
                                 <TableCell>Total Price</TableCell>
                                 <TableCell>$90,860</TableCell>
                                 <TableCell>$85,000</TableCell>
                              </TableRow>
                              <TableRow>
                                 <TableCell>Risk Score</TableCell>
                                 <TableCell>90</TableCell>
                                 <TableCell>75</TableCell>
                              </TableRow>
                              <TableRow>
                                 <TableCell>Overall Score</TableCell>
                                 <TableCell>85</TableCell>
                                 <TableCell>70</TableCell>
                              </TableRow>
                           </TableBody>
                        </Table>
                     </CardContent>
                  </Card>
               </TabsContent>
               <TabsContent value='reports' className='space-y-4'>
                  <Card>
                     <CardHeader>
                        <CardTitle>Proposal Summary Report</CardTitle>
                        <CardDescription>
                           Detailed summary of all proposals
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <Table>
                           <TableHeader>
                              <TableRow>
                                 <TableHead>ID</TableHead>
                                 <TableHead>Company</TableHead>
                                 <TableHead>Total Price</TableHead>
                                 <TableHead>Risk Score</TableHead>
                                 <TableHead>Overall Score</TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {proposalDetails.map((proposal) => (
                                 <TableRow key={proposal.id}>
                                    <TableCell>{proposal.id}</TableCell>
                                    <TableCell>{proposal.company}</TableCell>
                                    <TableCell>
                                       ${proposal.totalPrice.toLocaleString()}
                                    </TableCell>
                                    <TableCell>{proposal.riskScore}</TableCell>
                                    <TableCell>
                                       {proposal.overallScore}
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </CardContent>
                  </Card>
                  <Card>
                     <CardHeader>
                        <CardTitle>Detailed Analysis Report</CardTitle>
                        <CardDescription>
                           In-depth analysis of the selected proposal
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-4'>
                           <div>
                              <h3 className='text-lg font-semibold'>
                                 Financial Analysis
                              </h3>
                              <p>
                                 The total price of $90,860 is slightly above
                                 the industry average. This includes cloud
                                 access for Tally software and data migration
                                 services.
                              </p>
                           </div>
                           <div>
                              <h3 className='text-lg font-semibold'>
                                 Risk Assessment
                              </h3>
                              <p>
                                 The proposal demonstrates strong security
                                 measures and reliable infrastructure, resulting
                                 in a low risk assessment. However, the 100%
                                 advance payment requirement poses a potential
                                 financial risk.
                              </p>
                           </div>
                           <div>
                              <h3 className='text-lg font-semibold'>
                                 Pros and Cons
                              </h3>
                              <ul className='list-disc pl-5'>
                                 <li>
                                    Pro: Includes cloud setup service and
                                    initial training
                                 </li>
                                 <li>
                                    Pro: Offers a highly secure data environment
                                 </li>
                                 <li>Con: 100% advance payment required</li>
                                 <li>
                                    Con: Higher total price compared to the
                                    requirement
                                 </li>
                              </ul>
                           </div>
                           <div>
                              <h3 className='text-lg font-semibold'>
                                 Recommendation
                              </h3>
                              <p>
                                 Based on the comprehensive analysis, we
                                 recommend proceeding with the TEAM SOLUTIONS
                                 proposal. Despite the higher cost and advance
                                 payment requirement, the strong security
                                 measures, included services, and overall
                                 quality make it a suitable choice.
                              </p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
}
