"use client";

import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from 'lucide-react';
import { addAnalyseStore } from "@/stores/addAnalyse";

const Step1Page = () => {

    const { requestForProposalFileList, setRequestForProposalFileList } = addAnalyseStore();

    const handleRFPUpload = (e) => {
        if (e.target.files[0]) {
            setRequestForProposalFileList([e.target.files[0]]);
        }
    }

    const handleFileRemove = () => {
        setRequestForProposalFileList([]);
        // Reset the file input
        const fileInput = document.getElementById('rfp');
        if (fileInput) {
            fileInput.value = '';
        }
    }

    const bytesToMegabytes = (bytes) => {
        let megabytes = bytes / (1024 * 1024);
        return megabytes.toFixed(2)
    }

    return (
        <div>
            <CardHeader>
                <CardTitle>Step 1</CardTitle>
                <CardDescription>
                    Upload your request for proposal (RFP) document.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    {requestForProposalFileList.length === 0 ? (
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="rfp">Request for proposal</Label>
                            <Input id="rfp" type="file" onChange={(e) => { handleRFPUpload(e) }} accept="application/pdf" />
                        </div>
                    ) : (
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="rfp">Request for proposal</Label>
                            <div className="flex flex-row justify-between px-4 py-2 items-center border rounded">
                                <div className="flex flex-col gap-1 text-xs w-8/12">
                                    <span className="font-semibold">RFP Document</span>
                                    <div className="flex flex-row justify-between w-9/12">
                                        <span>File Name: {requestForProposalFileList[0].name}</span>
                                        <span>Size: {bytesToMegabytes(requestForProposalFileList[0].size)} Mb</span>
                                    </div>
                                </div>
                                <Trash2 className="text-destructive cursor-pointer" size={20} onClick={() => { handleFileRemove() }} />
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </div>
    );
}

export default Step1Page;