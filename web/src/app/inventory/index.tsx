import { Box, Chip, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react";

export const Route = createFileRoute("/inventory/")({
  component: RouteComponent,
})

function RouteComponent() {
  const [value, setValue] = useState<string>("virtual-machines");

  const sizeColorMap: Record<string, { bg: string; fg: string }> = {
    XS: { bg: "#E1F5FE", fg: "#000000" },
    S: { bg: "#E8F5E9", fg: "#000000" },
    M: { bg: "#FFF9C4", fg: "#000000" },
    L: { bg: "#FFE0B2", fg: "#000000" },
    XL: { bg: "#FFCDD2", fg: "#000000" },
    XXL: { bg: "#D1C4E9", fg: "#000000" }
  }
  function handleChange(_: React.SyntheticEvent, newValue: string) {
    setValue(newValue);
  }

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "application",
      headerName: "Application",
      description: "Application running on the virtual machine instance.",
      type: "custom",
      sortable: true,
      renderCell: (row) => {
        return (
          <Tooltip title={row.value?.name}>
            {row.value?.code}
          </Tooltip>
        );
      }
    },
    {
      field: "hostname",
      headerName: "Hostname",
      description: "Virtual machine instance hostname.",
      type: "string",
      sortable: true
    },
    {
      field: "ip",
      headerName: "IP Address",
      description: "IPv4 address of the instance's primary interface.",
      type: "string",
      sortable: false,
      minWidth: 125
    },
    {
      field: "size",
      headerName: "Size",
      description: "Virtual machine instance size details.",
      type: "custom",
      sortable: true,
      renderCell: (row) => {
        const tshirt = row.value?.tshirt as string | undefined;
        const color = tshirt ? sizeColorMap[tshirt] : undefined;
        const tooltip = "vCPU: " + row.value?.cpu + " | RAM: " + (row.value?.memory ? row.value.memory / 1024 : "-") + " GB";
        return (
          <Tooltip title={tooltip}>
            <Chip
              label={tshirt ?? "-"}
              sx={color ? { bgcolor: color.bg } : undefined}
            />
          </Tooltip>
        );
      }
    },
    {
      field: "disks",
      headerName: "Disk Utilization",
      description: "Overall disk utilization across all local and network filesystems.",
      type: "custom",
      sortable: false,
      minWidth: 125,
      renderCell: (row) => {
        return (
          row.value ? `${row.value.utilization}%` : "-"
        );
      }
    },
    {
      field: "location",
      headerName: "Location",
      description: "Physical location of the virtual machine instance.",
      type: "custom",
      sortable: true,
      renderCell: (row) => {
        return (
          <Tooltip title={row.value?.name}>
            {row.value?.shortName}
          </Tooltip>
        );
      }
    },
    {
      field: "os",
      headerName: "Operating System",
      description: "Guest operating system running on the virtual machine instance.",
      type: "custom",
      sortable: true,
      minWidth: 150,
      renderCell: (row) => {
        return (
          <Tooltip title={row.value?.name}>
            {row.value?.shortName}
          </Tooltip>
        )
      }
    },
    {
      field: "created",
      headerName: "Created",
      description: "Timestamp of virtual machine instance provisioning.",
      type: "dateTime",
      sortable: true,
      minWidth: 150,
      renderCell: (row) => {
        const raw = row.value;
        const date = raw instanceof Date ? raw : raw ? new Date(raw) : undefined;
        if (!date) return "-";
        const dateOnly = date.toLocaleDateString();
        const full = date.toLocaleString();
        return (
          <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
            <Tooltip title={full}>
              {dateOnly}
            </Tooltip>
          </Box>
        );
      }
    },
    {
      field: "expires",
      headerName: "Expires",
      description: "Timestamp of virtual machine instance expiration.",
      type: "dateTime",
      sortable: true,
      minWidth: 150,
      renderCell: (row) => {
        const raw = row.value;
        const date = raw instanceof Date ? raw : raw ? new Date(raw) : undefined;
        if (!date) return "-";
        const now = new Date();
        const diffMs = date.getTime() - now.getTime();
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        let label: string;
        if (diffMs <= 0) {
          label = "expired";
        } else {
          label = `in ${diffDays} day${diffDays === 1 ? "" : "s"}`;
        }
        const paletteColor = diffMs <= 0 ? "error.main" : diffDays > 30 ? "success.main" : diffDays > 14 ? "warning.main" : "error.main";
        return (
          <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start", color: paletteColor }}>
            <Tooltip title={date.toLocaleString()}>
              {label}
            </Tooltip>
          </Box>
        );
      }
    }
  ]

  const rows = [
    {
      id: "328950105h345h32b",
      application: {
        name: "Sailpoint IdentityIQ",
        code: "SIIQ"
      },
      hostname: "testvm001",
      ip: "10.100.43.15",
      size: {
        tshirt: "M",
        cpu: 4,
        memory: 16384
      },
      disks: {
        utilization: 46,
        disks: [
          "nvme0p1",
          "nvme0p2",
          "nvme1p1",
        ],
        filesystems: [
          {
            name: "/var/log",
            type: "xfs",
            utilization: 89
          }
        ]
      },
      location: {
        name: "US Federal Data Center SY815-00B",
        shortName: "SYB",
        address: "123 Secret St. Nowhere, VA 12345"
      },
      os: {
        family: "Linux",
        name: "Red Hat Enterprise Linux 10",
        shortName: "RHEL",
        version: "10.1"
      },
      created: new Date("2026-12-01T15:30:35Z"),
      expires: new Date("2027-01-01T06:00:00Z")
    },
    {
      id: "385923-153925-1",
      hostname: "testvm002"
    },
    {
      id: "523532-ff89",
      hostname: "testvm003"
    }
  ]

  return (
    <Box>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Accounts" value={"accounts"} />
        <Tab label="Authentication" value={"authentication"} />
        <Tab label="Authorization" value={"authorization"} />
        <Tab label="Namespaces" value={"namespaces"} />
        <Tab label="Virtual Machines" value={"virtual-machines"} />
        <Tab label="Load Balancer Pools" value={"load-balancer-pools"} />
        <Tab label="Databases" value={"databases"} />
        <Tab label="Networks" value={"networks"} />
        <Tab label="Firewall Rules" value={"firewall-rules"} />
      </Tabs>
      {value === "accounts" && <Typography>Accounts</Typography>}
      {value === "virtual-machines" && <Box>
        <Typography>Virtual Machines</Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25
              }
            }
          }}
          pageSizeOptions={[5, 10, 15, 25, 50, 75, 100]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>}
    </Box>
  );
}
