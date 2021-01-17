import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ThemeService, ThemeServiceFollowSystemOn, ThemeServiceFollowSystemOff, Theme } from 'ng-devui/theme';
import { Subscription } from 'rxjs';

import { greenLightTheme } from './theme-data-more';
import { greenDarkTheme } from './theme-data-more';
import { devuiLightLargeTheme } from './theme-data-more';
import { devuiDarkLargeTheme } from './theme-data-more';
import { greenLightLargeTheme } from './theme-data-more';
import { greenDarkLargeTheme } from './theme-data-more';
@Component({
    selector: 'app-theme-picker',
    templateUrl: './theme-picker.component.html',
    styleUrls: ['./theme-picker.component.scss'],
})
export class ThemePickerComponent implements OnInit, OnDestroy {
    myTheme: Theme[];
    themeService: ThemeService;
    themes;
    theme: string;
    curTheme: Theme;
    fontSize: 'normal' | 'large' = 'normal';
    themeMode: 'light' | 'dark' = 'light';
    themePrefix: 'devui' | 'green' | string = 'devui';
    themePrefersColorScheme: boolean;
    sub: Subscription;
    protectEye = false;
    constructor(
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.themeService = window['devuiThemeService'];
        this.themes = window['devuiThemes'];
        this.myTheme = [greenLightTheme, greenDarkTheme, devuiLightLargeTheme, devuiDarkLargeTheme, greenDarkLargeTheme, greenLightLargeTheme];

        for (var it in this.myTheme) {
            // console.log(it);
            this.themes[this.myTheme[it]['id']] = this.myTheme[it];
        }
        //console.log(window);
        //console.log(this.themes);
        this.theme = window['devuiCurrentTheme'];
        this.themePrefix = this.theme.split('-')[0];
        this.themeMode = this.themes[this.theme]?.isDark ? 'dark' : 'light';
        this.protectEye = this.theme.split('-')[2] === 'large' ? true : false;
        this.themePrefersColorScheme = this.getThemePrefersColorSchemeOn();
        this.cdr.detectChanges();
        if (this.themePrefersColorScheme) {
            this.themePrefersColorSchemeChange(true);
        }
    }

    themePrefixChange(prefix: string) {
        this.themePrefix = prefix;
        if (this.themePrefersColorScheme) {
            this.themePrefersColorSchemeChange(true);
        } else {
            this.themesChange();
        }
    }

    themesChange() {
        if (this.protectEye) {
            this.theme = `${this.themePrefix}-${this.themeMode}-large-theme`;
        } else {
            this.theme = `${this.themePrefix}-${this.themeMode}-theme`;
        }
        // console.log(this.themes);
        //console.log(this.theme);
        this.themeService.applyTheme(this.themes[this.theme]);
    }

    themeFontSizeChange() {
        this.themesChange();
    }

    themeFontSizeSchemeChange(event: boolean) {
        if (event) {
            if (this.sub) {
                ThemeServiceFollowSystemOff(this.sub);
            }
            this.sub = ThemeServiceFollowSystemOn({
                lightThemeName: `${this.themePrefix}-light-large-theme`,
                darkThemeName: `${this.themePrefix}-dark-large-theme`
            });
            this.setThemeFontSizeScheme('on');
        } else {
            ThemeServiceFollowSystemOff(this.sub);
            this.setThemeFontSizeScheme('off');
            this.sub = undefined;
            this.themesChange();
        }
    }

    themePrefersColorSchemeChange(event: boolean) {
        if (event) {
            if (this.sub) {
                ThemeServiceFollowSystemOff(this.sub);
            }
            this.sub = ThemeServiceFollowSystemOn({
                lightThemeName: `${this.themePrefix}-light-theme`,
                darkThemeName: `${this.themePrefix}-dark-theme`
            });
            this.setThemePrefersColorScheme('on');
        } else {
            ThemeServiceFollowSystemOff(this.sub);
            this.setThemePrefersColorScheme('off');
            this.sub = undefined;
            this.themesChange();
        }
    }

    ngOnDestroy(): void {
        if (this.themePrefersColorScheme) {
            ThemeServiceFollowSystemOff(this.sub);
        }
    }

    getThemeFontSizeSchemeOn() {
        return localStorage.getItem('devuiThemeFontSizeScheme') === 'on';
    }

    setThemeFontSizeScheme(value: 'on' | 'off') {
        localStorage.setItem('devuiThemeFontSizeScheme', value);
    }

    getThemePrefersColorSchemeOn() {
        return localStorage.getItem('devuiThemePrefersColorScheme') === 'on';
    }

    setThemePrefersColorScheme(value: 'on' | 'off') {
        localStorage.setItem('devuiThemePrefersColorScheme', value);
    }
}