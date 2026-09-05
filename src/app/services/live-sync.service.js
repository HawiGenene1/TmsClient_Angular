import { __decorate } from "tslib";
import { Service, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';
let LiveSyncService = class LiveSyncService {
    platformId = inject(PLATFORM_ID);
    connection = null;
    eventsSubject = new Subject();
    // Expose events as observable
    events$ = this.eventsSubject.asObservable();
    // Connection state signal
    connectionState = signal('disconnected');
    connect() {
        if (this.connection)
            return;
        // SignalR uses WebSocket which only exists in browsers
        if (!isPlatformBrowser(this.platformId))
            return;
        this.connection = new HubConnectionBuilder()
            .withUrl('/hubs/tms')
            .withAutomaticReconnect([0, 2000, 10000, 30000])
            .build();
        // Listen for enrollment status updates
        this.connection.on('ReceiveEnrollmentStatusUpdated', (enrollmentId, status) => {
            this.eventsSubject.next({ id: enrollmentId, status });
        });
        // Connection state updates
        this.connection.onreconnecting(() => this.connectionState.set('reconnecting'));
        this.connection.onreconnected(() => this.connectionState.set('connected'));
        this.connection.onclose(() => this.connectionState.set('disconnected'));
        // Start connection
        this.connection.start()
            .then(() => this.connectionState.set('connected'))
            .catch((err) => console.error('SignalR connection error:', err));
    }
};
LiveSyncService = __decorate([
    Service()
], LiveSyncService);
export { LiveSyncService };
