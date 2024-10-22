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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

// Mock data for multiple proposals
const proposalsData = [
   {
      id: "PROP001",
      company: "TEAM SOLUTIONS",
      totalPrice: 90860,
      riskScore: 90,
      overallScore: 85,
      financialScore: 80,
      pros: [
         "Includes cloud setup service",
         "Provides initial training and admin user rights training",
         "Offers a highly secure data environment",
      ],
      cons: [
         "100% advance payment required",
         "Higher total price compared to the requirement",
         "Limited flexibility in payment terms",
      ],
   },
   {
      id: "PROP002",
      company: "CLOUD TECH",
      totalPrice: 85000,
      riskScore: 75,
      overallScore: 78,
      financialScore: 85,
      pros: [
         "Competitive pricing",
         "Flexible payment terms",
         "24/7 customer support",
      ],
      cons: [
         "Limited training options",
         "Standard security measures",
         "Longer implementation timeline",
      ],
   },
   {
      id: "PROP003",
      company: "DATA SECURE",
      totalPrice: 95000,
      riskScore: 95,
      overallScore: 88,
      financialScore: 75,
      pros: [
         "Advanced security features",
         "Comprehensive training program",
         "Rapid implementation",
      ],
      cons: [
         "Higher price point",
         "Limited customization options",
         "Strict cancellation policy",
      ],
   },
];

const monthlyTrends = [
   { month: "Jan", proposals: 3, avgScore: 82 },
   { month: "Feb", proposals: 5, avgScore: 78 },
   { month: "Mar", proposals: 2, avgScore: 85 },
   { month: "Apr", proposals: 7, avgScore: 80 },
   { month: "May", proposals: 4, avgScore: 88 },
   { month: "Jun", proposals: 6, avgScore: 85 },
];

export function OverallDashboardComponent() {
   const [selectedProposal, setSelectedProposal] = React.useState(
      proposalsData[0]
   );

   const overallScores = [
      { name: "Financial", score: selectedProposal.financialScore },
      { name: "Risk Assessment", score: selectedProposal.riskScore },
      { name: "Overall", score: selectedProposal.overallScore },
   ];

   const averageScores = {
      financial:
         proposalsData.reduce((sum, prop) => sum + prop.financialScore, 0) /
         proposalsData.length,
      risk:
         proposalsData.reduce((sum, prop) => sum + prop.riskScore, 0) /
         proposalsData.length,
      overall:
         proposalsData.reduce((sum, prop) => sum + prop.overallScore, 0) /
         proposalsData.length,
   };

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
                           <div className='text-2xl font-bold'>
                              {proposalsData.length}
                           </div>
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
                           <div className='text-2xl font-bold'>
                              $
                              {Math.round(
                                 proposalsData.reduce(
                                    (sum, prop) => sum + prop.totalPrice,
                                    0
                                 ) / proposalsData.length
                              ).toLocaleString()}
                           </div>
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
                           <div className='text-2xl font-bold'>
                              {Math.max(
                                 ...proposalsData.map(
                                    (prop) => prop.overallScore
                                 )
                              )}
                              %
                           </div>
                           <p className='text-xs text-muted-foreground'>
                              {
                                 proposalsData.find(
                                    (prop) =>
                                       prop.overallScore ===
                                       Math.max(
                                          ...proposalsData.map(
                                             (p) => p.overallScore
                                          )
                                       )
                                 )?.company
                              }
                           </p>
                        </CardContent>
                     </Card>
                     <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                           <CardTitle className='text-sm font-medium'>
                              Average Risk Score
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
                           <div className='text-2xl font-bold'>
                              {Math.round(
                                 proposalsData.reduce(
                                    (sum, prop) => sum + prop.riskScore,
                                    0
                                 ) / proposalsData.length
                              )}
                           </div>
                           <p className='text-xs text-muted-foreground'>
                              Average across all proposals
                           </p>
                        </CardContent>
                     </Card>
                  </div>
                  <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                     <Card className='col-span-4'>
                        <CardHeader>
                           <CardTitle>Overall Scores</CardTitle>
                           <CardDescription>
                              Select a proposal to view detailed scores
                           </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Select
                              value={selectedProposal.id}
                              onValueChange={(value) =>
                                 setSelectedProposal(
                                    proposalsData.find(
                                       (prop) => prop.id === value
                                    ) || proposalsData[0]
                                 )
                              }
                           >
                              <SelectTrigger className='w-[180px] mb-4'>
                                 <SelectValue placeholder='Select a proposal' />
                              </SelectTrigger>
                              <SelectContent>
                                 {proposalsData.map((proposal) => (
                                    <SelectItem
                                       key={proposal.id}
                                       value={proposal.id}
                                    >
                                       {proposal.company}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
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
                           <CardTitle>Proposal Comparison</CardTitle>
                           <CardDescription>
                              Compare selected proposal with averages
                           </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <ChartContainer
                              config={{
                                 selected: {
                                    label: "Selected Proposal",
                                    color: "hsl(var(--chart-2))",
                                 },
                                 average: {
                                    label: "Average",
                                    color: "hsl(var(--chart-3))",
                                 },
                              }}
                              className='h-[200px]'
                           >
                              <ResponsiveContainer width='100%' height='100%'>
                                 <BarChart
                                    data={[
                                       {
                                          name: "Financial",
                                          selected:
                                             selectedProposal.financialScore,
                                          average: averageScores.financial,
                                       },
                                       {
                                          name: "Risk",
                                          selected: selectedProposal.riskScore,
                                          average: averageScores.risk,
                                       },
                                       {
                                          name: "Overall",
                                          selected:
                                             selectedProposal.overallScore,
                                          average: averageScores.overall,
                                       },
                                    ]}
                                 >
                                    <XAxis dataKey='name' />
                                    <YAxis />
                                    <ChartTooltip
                                       content={<ChartTooltipContent />}
                                    />
                                    <Bar
                                       dataKey='selected'
                                       fill='var(--color-selected)'
                                    />
                                    <Bar
                                       dataKey='average'
                                       fill='var(--color-average)'
                                    />
                                 </BarChart>
                              </ResponsiveContainer>
                           </ChartContainer>
                        </CardContent>
                     </Card>
                  </div>
                  <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                     <Card className='col-span-4'>
                        <CardHeader>
                           <CardTitle>Proposal Analysis</CardTitle>
                           <CardDescription>
                              {selectedProposal.company}
                           </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className='space-y-8'>
                              <div className='flex items-center'>
                                 <span className='text-2xl font-bold'>
                                    Pros
                                 </span>
                              </div>
                              <ul className='grid gap-3 text-sm'>
                                 {selectedProposal.pros.map((pro, index) => (
                                    <li
                                       key={index}
                                       className='flex items-center'
                                    >
                                       <CheckCircle2 className='mr-2 h-4 w-4 text-green-500' />
                                       {pro}
                                    </li>
                                 ))}
                              </ul>
                              <div className='flex items-center'>
                                 <span className='text-2xl font-bold'>
                                    Cons
                                 </span>
                              </div>
                              <ul className='grid gap-3 text-sm'>
                                 {selectedProposal.cons.map((con, index) => (
                                    <li
                                       key={index}
                                       className='flex items-center'
                                    >
                                       <XCircle className='mr-2 h-4 w-4 text-red-500' />
                                       {con}
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </CardContent>
                     </Card>
                     <Card className='col-span-3'>
                        <CardHeader>
                           <CardTitle>Risk Assessment</CardTitle>
                           <CardDescription>
                              Comparison of risk scores
                           </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <ChartContainer
                              config={{
                                 score: {
                                    label: "Risk Score",
                                    color: "hsl(var(--chart-3))",
                                 },
                              }}
                              className='h-[200px]'
                           >
                              <ResponsiveContainer width='100%' height='100%'>
                                 <BarChart
                                    data={proposalsData}
                                    layout='vertical'
                                 >
                                    <XAxis type='number' domain={[0, 100]} />
                                    <YAxis
                                       dataKey='company'
                                       type='category'
                                       width={100}
                                    />
                                    <ChartTooltip
                                       content={<ChartTooltipContent />}
                                    />
                                    <Bar
                                       dataKey='riskScore'
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
                                       {
                                          range: "61-80",
                                          count: proposalsData.filter(
                                             (p) =>
                                                p.overallScore >= 61 &&
                                                p.overallScore <= 80
                                          ).length,
                                       },
                                       {
                                          range: "81-100",
                                          count: proposalsData.filter(
                                             (p) => p.overallScore > 80
                                          ).length,
                                       },
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
                                 <TableHead>Company</TableHead>
                                 <TableHead>Total Price</TableHead>
                                 <TableHead>Risk Score</TableHead>
                                 <TableHead>Overall Score</TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {proposalsData.map((proposal) => (
                                 <TableRow key={proposal.id}>
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
                              {proposalsData.map((proposal) => (
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
                                 The total price of $
                                 {selectedProposal.totalPrice.toLocaleString()}{" "}
                                 is
                                 {selectedProposal.totalPrice >
                                 averageScores.financial
                                    ? " above "
                                    : " below "}
                                 the average of $
                                 {Math.round(
                                    averageScores.financial
                                 ).toLocaleString()}
                                 . This includes cloud access for Tally software
                                 and data migration services.
                              </p>
                           </div>
                           <div>
                              <h3 className='text-lg font-semibold'>
                                 Risk Assessment
                              </h3>
                              <p>
                                 The proposal demonstrates
                                 {selectedProposal.riskScore >
                                 averageScores.risk
                                    ? " strong "
                                    : " average "}
                                 security measures and infrastructure, resulting
                                 in a risk score of {selectedProposal.riskScore}
                                 compared to the average of{" "}
                                 {Math.round(averageScores.risk)}.
                              </p>
                           </div>
                           <div>
                              <h3 className='text-lg font-semibold'>
                                 Pros and Cons
                              </h3>
                              <ul className='list-disc pl-5'>
                                 {selectedProposal.pros.map((pro, index) => (
                                    <li key={index}>Pro: {pro}</li>
                                 ))}
                                 {selectedProposal.cons.map((con, index) => (
                                    <li key={index}>Con: {con}</li>
                                 ))}
                              </ul>
                           </div>
                           <div>
                              <h3 className='text-lg font-semibold'>
                                 Recommendation
                              </h3>
                              <p>
                                 Based on the comprehensive analysis,{" "}
                                 {selectedProposal.company}&apos;s proposal
                                 {selectedProposal.overallScore ===
                                 Math.max(
                                    ...proposalsData.map((p) => p.overallScore)
                                 )
                                    ? " stands out as the top choice. "
                                    : " is a strong contender, but may not be the best option. "}
                                 Consider the balance between cost, security
                                 measures, and additional services when making
                                 the final decision.
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
