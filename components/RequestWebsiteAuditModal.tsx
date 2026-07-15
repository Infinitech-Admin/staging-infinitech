"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@heroui/react";
import { FaGlobe } from "react-icons/fa";
import { GoCheck } from "react-icons/go";

interface RequestWebsiteAuditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AuditFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  details: string;
}

const initialForm: AuditFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  details: "",
};

const RequestWebsiteAuditModal = ({
  isOpen,
  onOpenChange,
}: RequestWebsiteAuditModalProps) => {
  const [form, setForm] = useState<AuditFormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof AuditFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValid =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.website.trim() !== "";

  const handleSubmit = async () => {
    if (!isValid) return;
    setSubmitting(true);
    try {
      // TODO: wire this up to your real endpoint / API route
      // await fetch("/api/website-audit-request", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      await new Promise((res) => setTimeout(res, 800)); // mock latency
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Reset internal state whenever the modal closes
  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setTimeout(() => {
        setForm(initialForm);
        setSubmitted(false);
        setSubmitting(false);
      }, 200); // wait for close animation
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenChange} placement="center">
      <ModalContent>
        {(onClose) =>
          submitted ? (
            <>
              <ModalBody className="py-10 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                  <GoCheck className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-primary font-bold text-lg">
                  Request Sent!
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Our team will reach out with your website audit shortly.
                </p>
              </ModalBody>
              <ModalFooter className="justify-center">
                <Button
                  className="bg-accent text-white font-medium"
                  onPress={onClose}
                >
                  Done
                </Button>
              </ModalFooter>
            </>
          ) : (
            <>
              <ModalHeader className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 shrink-0">
                  <FaGlobe className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-primary font-bold text-base leading-tight">
                    Request a Website Audit
                  </p>
                  <p className="text-gray-500 text-xs font-normal">
                    Tell us about your site and we&apos;ll follow up with a full
                    audit.
                  </p>
                </div>
              </ModalHeader>
              <ModalBody className="gap-3">
                <Input
                  label="Full Name"
                  placeholder="Juan Dela Cruz"
                  value={form.name}
                  onValueChange={(v) => handleChange("name", v)}
                  isRequired
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="juan@company.com"
                  value={form.email}
                  onValueChange={(v) => handleChange("email", v)}
                  isRequired
                />
                <Input
                  label="Phone Number"
                  placeholder="09XX XXX XXXX"
                  value={form.phone}
                  onValueChange={(v) => handleChange("phone", v)}
                />
                <Input
                  label="Company Name"
                  placeholder="Your Business Inc."
                  value={form.company}
                  onValueChange={(v) => handleChange("company", v)}
                />
                <Input
                  label="Website URL"
                  placeholder="https://yourbusiness.com"
                  value={form.website}
                  onValueChange={(v) => handleChange("website", v)}
                  isRequired
                />
                <Textarea
                  label="What would you like us to focus on?"
                  placeholder="e.g. SEO, page speed, mobile usability, conversion rate..."
                  value={form.details}
                  onValueChange={(v) => handleChange("details", v)}
                  minRows={3}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-accent text-white font-medium"
                  isDisabled={!isValid}
                  isLoading={submitting}
                  onPress={handleSubmit}
                >
                  Submit Request
                </Button>
              </ModalFooter>
            </>
          )
        }
      </ModalContent>
    </Modal>
  );
};

export default RequestWebsiteAuditModal;
