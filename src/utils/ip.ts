import ipaddr from 'ipaddr.js';
import type { IPRange } from '../types/ip';

export const validateIPAddress = (ip: string): boolean => {
  try {
    ipaddr.parse(ip);
    return true;
  } catch {
    return false;
  }
};

export const validateSubnet = (subnet: number): boolean => {
  return subnet >= 0 && subnet <= 32;
};

export const calculateIPRange = (ip: string, subnet: number): IPRange | null => {
  try {
    const addr = ipaddr.parse(ip);
    if (addr.kind() !== 'ipv4') return null;

    const prefix = addr.prefixFrom(subnet);
    const startIP = prefix.networkAddress().toString();
    const endIP = prefix.broadcastAddress().toString();
    const totalIPs = Math.pow(2, 32 - subnet) - 2; // Excluding network and broadcast addresses

    return {
      startIP,
      endIP,
      totalIPs,
    };
  } catch {
    return null;
  }
};