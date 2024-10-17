export enum OrderStatus {
    PENDING = 'pending',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
    REFUNDED = 'refunded'
}

export enum OrderMode {
    EMERGENCY = 'emergency',
    REGULAR = 'regular'
}

export enum PaymentMethod {
    CASH = 'cash',
    CARD = 'card',
    ONLINE = 'online'
}

export enum PaymentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed'
}
